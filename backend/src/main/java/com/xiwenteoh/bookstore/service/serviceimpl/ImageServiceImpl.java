package com.xiwenteoh.bookstore.service.serviceimpl;

import com.xiwenteoh.bookstore.dao.BookImageDao;
import com.xiwenteoh.bookstore.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImageServiceImpl implements ImageService {
    @Autowired
    BookImageDao bookImageDao;

    public byte[] findBookImageById(String uuid) {
        return bookImageDao.findBookImageById(uuid).getData();
    }
}
