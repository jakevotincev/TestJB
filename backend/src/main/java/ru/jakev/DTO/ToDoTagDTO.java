package ru.jakev.DTO;

import ru.jakev.color.Color;


public class ToDoTagDTO {

    private Long id;
    private String title;
    private Color color;
    private Long itemId;


    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Color getColor() {
        return color;
    }

    public Long getItemId() {
        return itemId;
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

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

}
