package ru.jakev.repositories;

import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.repository.CrudRepository;
import ru.jakev.entities.ToDoItem;

import java.util.List;

@Repository
public interface ToDoItemRepository extends CrudRepository<ToDoItem, Long> {
    void updateIndexById(@Id Long id, int index);
    List<ToDoItem> findByOwnerUsernameOrderByIndex(String username);
    void updateDoneById(@Id Long id, boolean done);

}
