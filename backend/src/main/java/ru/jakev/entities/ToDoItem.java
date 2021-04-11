package ru.jakev.entities;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
public class ToDoItem {
    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    private String title;
    private boolean done;
    private int index;

    @OneToMany(mappedBy = "item")
    private List<ToDoTag> toDoTags;

    @ManyToOne
    @JoinColumn(name="owner_id", referencedColumnName = "id")
    private User owner;

    public ToDoItem() {
    }

    public ToDoItem(@NotBlank String title, boolean done, int index, User owner) {
        this.title = title;
        this.done = done;
        this.index = index;
        this.owner = owner;
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

    public int getIndex() {
        return index;
    }

    public List<ToDoTag> getToDoTags() {
        return toDoTags;
    }

    public User getOwner() {
        return owner;
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

    public void setIndex(int index) {
        this.index = index;
    }

    public void setToDoTags(List<ToDoTag> toDoTags) {
        this.toDoTags = toDoTags;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}
