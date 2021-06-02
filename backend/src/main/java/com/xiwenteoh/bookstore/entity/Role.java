package com.xiwenteoh.bookstore.entity;

import com.xiwenteoh.bookstore.constant.EnumRole;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "role")
public class Role {
    @Id
    @Column(name = "role_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "role_type")
    private EnumRole roleType;
}
