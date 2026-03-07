package com.khetsetu.model.dto.request;

import lombok.*;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequestDTO {
    private String name;
    private String email;
    private String villageId;
}