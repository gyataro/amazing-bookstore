package com.xiwenteoh.bookstore.entity.Image;

import com.xiwenteoh.bookstore.entity.Book;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Data
@MappedSuperclass
public abstract class Image {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String type;

    @Lob
    private byte[] data;

    Image(String type, byte[] data) {
        this.type = type;
        this.data = data;
    }
}
