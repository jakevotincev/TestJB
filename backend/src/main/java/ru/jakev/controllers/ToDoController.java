package ru.jakev.controllers;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.*;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.rules.SecurityRule;
import ru.jakev.DTO.ToDoItemDTO;
import ru.jakev.DTO.ToDoTagDTO;
import ru.jakev.entities.ToDoItem;
import ru.jakev.entities.ToDoTag;
import ru.jakev.entities.User;
import ru.jakev.repositories.ToDoItemRepository;
import ru.jakev.repositories.ToDoTagRepository;
import ru.jakev.repositories.UserRepository;

import javax.inject.Inject;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;


@Controller("/todolist")
@Secured(SecurityRule.IS_AUTHENTICATED)
public class ToDoController {

    @Inject
    private ToDoItemRepository toDoItemRepository;

    @Inject
    private ToDoTagRepository toDoTagRepository;

    @Inject
    private UserRepository userRepository;

    @Get
    public HttpResponse<?> getByOwnerUsername(@QueryValue String username) {
        List<ToDoItem> items = toDoItemRepository.findByOwnerUsernameOrderByIndex(username);
        List<ToDoItemDTO> toDoItemDTOList = new LinkedList<>();
        items.forEach(item -> {
            List<ToDoTag> tagList = toDoTagRepository.findByItemId(item.getId());
            List<ToDoTagDTO> tagDTOList = tagList.stream().map(this::toDoTagEntityToDTO).collect(Collectors.toList());
            toDoItemDTOList.add(new ToDoItemDTO(item.getId(), item.getTitle(), item.isDone(), tagDTOList, item.getOwner().getUsername(), item.getIndex()));
        });
        return HttpResponse.status(HttpStatus.OK).body(toDoItemDTOList);
    }

    @Post
    public HttpResponse<?> save(@Body ToDoItemDTO item) {
        ToDoItem newItem = toDoItemRepository.save(toDoItemDtoToEntity(item));
        return HttpResponse.status(HttpStatus.CREATED).body(toDoItemEntityToDTO(newItem));
    }

    @Put("/index")
    public HttpResponse<?> changeIndexes(@Body List<ToDoItemDTO> items) {
        items.forEach(item -> {
            toDoItemRepository.updateIndexById(item.getId(), item.getIndex());
        });
        return HttpResponse.status(HttpStatus.OK).body("Updated items successfully!");
    }

    @Put("/done")
    public HttpResponse<?> changeDone(@Body ToDoItemDTO itemDTO) {
        toDoItemRepository.updateDoneById(itemDTO.getId(), itemDTO.isDone());
        return HttpResponse.status(HttpStatus.OK).body("Updated items successfully!");
    }


    @Delete
    public HttpResponse<?> deleteItem(@QueryValue Long id) {
        toDoTagRepository.removeByItemId(id);
        toDoItemRepository.deleteById(id);
        return HttpResponse.status(HttpStatus.NO_CONTENT).body("Deleted item successfully!");
    }

    @Post("/tag")
    public HttpResponse<?> save(@Body ToDoTagDTO tag) {
        ToDoTag toDoTag = new ToDoTag(tag.getTitle(), tag.getColor(), toDoItemRepository.findById(tag.getItemId()).orElse(null));
        toDoTag = toDoTagRepository.save(toDoTag);
        return HttpResponse.status(HttpStatus.CREATED).body(toDoTagEntityToDTO(toDoTag));
    }

    @Delete("/tag")
    public HttpResponse<?> deleteTag(@QueryValue Long id) {
        toDoTagRepository.deleteById(id);
        return HttpResponse.status(HttpStatus.NO_CONTENT).body("Deleted tag successfully!");
    }

    private ToDoTagDTO toDoTagEntityToDTO(ToDoTag tag) {
        ToDoTagDTO dto = new ToDoTagDTO();
        dto.setId(tag.getId());
        dto.setColor(tag.getColor());
        dto.setTitle(tag.getTitle());
        dto.setItemId(tag.getItemId());
        return dto;
    }

    private ToDoItem toDoItemDtoToEntity(ToDoItemDTO dto) {
        User user = userRepository.findByUsername(dto.getOwnerName()).orElse(null);
        return new ToDoItem(dto.getTitle(), dto.isDone(), dto.getIndex(), user);
    }

    private ToDoItemDTO toDoItemEntityToDTO(ToDoItem item) {
        return new ToDoItemDTO(item.getId(), item.getTitle(), item.isDone(), null, item.getOwner().getUsername(), item.getIndex());
    }

}
