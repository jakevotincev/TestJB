package ru.jakev.DTO;

import java.util.List;

public class ToDoItemDTO {

    private Long id;
    private String title;
    private boolean done;
    private Integer index;
    private List<ToDoTagDTO> tags;
    private String ownerName;

    public ToDoItemDTO() {
    }

    public ToDoItemDTO(Long id, String title, boolean done, List<ToDoTagDTO> tags, String ownerName, Integer index) {
        this.id = id;
        this.title = title;
        this.done = done;
        this.tags = tags;
        this.ownerName = ownerName;
        this.index = index;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public boolean isDone() {
        return done;
    }

    public List<ToDoTagDTO> getTags() {
        return tags;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public Integer getIndex() {
        return index;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public void setTags(List<ToDoTagDTO> tags) {
        this.tags = tags;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

}
