package com.anushika.springbootlibrary.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.service.spi.InjectService;

@Entity
@Table(name = "user")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;
}
