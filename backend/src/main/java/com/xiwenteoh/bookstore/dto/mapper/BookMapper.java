package com.xiwenteoh.bookstore.dto.mapper;

import com.xiwenteoh.bookstore.dto.request.BookRequest;
import com.xiwenteoh.bookstore.dto.resource.BookResource;
import com.xiwenteoh.bookstore.entity.Book;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface BookMapper {
    BookMapper INSTANCE = Mappers.getMapper(BookMapper.class);

    @Mapping(target = "id", source = "id")
    BookResource bookToBookResource(Book book);

    @Mapping(target = "id", source = "id")
    List<BookResource> bookToBookResource(List<Book> book);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "imageUrl", ignore = true)
    Book bookRequestToBook(BookRequest bookRequest);

    @Mapping(target = "active", ignore = true)
    Book bookResourceToBook(BookResource bookResource);
}
