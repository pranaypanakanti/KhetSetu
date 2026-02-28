package com.khetsetu.model.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDTO {
    private String accessToken;
    private String refreshToken;
    private String email;
    private String name;
    private String role;

    public AuthResponseDTO(String accessToken) {
        this.accessToken = accessToken;
    }
}