package ru.jakev.entities;

import ru.jakev.color.Color;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
public class ToDoTag {

    public ToDoTag() {
    }

    public ToDoTag(@NotBlank String title, Color color, @NotNull ToDoItem item) {
        this.title = title;
        this.color = color;
        this.item = item;
    }

    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    private String title;
    @Enumerated(EnumType.STRING)
    private Color color;

    @ManyToOne
    @JoinColumn(name = "item_id", referencedColumnName = "id")
    @NotNull
    private ToDoItem item;

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Color getColor() {
        return color;
    }

    public ToDoItem getItem() {
        return item;
    }

    public Long getItemId() {
        return item.getId();
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public void setItem(ToDoItem item) {
        this.item = item;
    }


}
