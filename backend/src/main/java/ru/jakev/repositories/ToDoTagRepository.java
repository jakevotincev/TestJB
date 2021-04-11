package ru.jakev.repositories;

import io.micronaut.data.annotation.Repository;
import io.micronaut.data.repository.CrudRepository;
import ru.jakev.entities.ToDoTag;

import java.util.List;

@Repository
public interface ToDoTagRepository extends CrudRepository<ToDoTag, Long> {
    List<ToDoTag> findByItemId(Long id);
    void removeByItemId(Long id);
}
