package com.xiwenteoh.bookstore.entity;

import com.xiwenteoh.bookstore.constant.EnumRole;

import javax.persistence.*;

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

    public Role() {

    }

    public Role(EnumRole roleType) {
        this.roleType = roleType;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public EnumRole getRoleType() {
        return this.roleType;
    }

    public void setRoleType(EnumRole roleType) {
        this.roleType = roleType;
    }
}
