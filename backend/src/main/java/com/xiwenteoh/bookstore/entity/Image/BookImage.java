package com.xiwenteoh.bookstore.entity.Image;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "book_image")
public class BookImage extends Image {

    public BookImage(String type, byte[] bytes) {
        super(type, bytes);
    }

    public BookImage() {
        super(null, null);
    }
}
