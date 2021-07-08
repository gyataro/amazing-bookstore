package com.xiwenteoh.bookstore.controller;

import com.xiwenteoh.bookstore.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/image")
public class ImageController {
    @Autowired
    ImageService imageService;

    @GetMapping(value = "/book/{bookImageId}")
    public ResponseEntity<byte[]> findBookImageById(@PathVariable String bookImageId) {
        byte[] bookImageData = imageService.findBookImageById(bookImageId);

        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(bookImageData);
    }
}
