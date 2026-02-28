package com.khetsetu.model.dto.response;

import java.util.Map;

public record ErrorResponseDTO(
        String code,
        String message,
        Map<String, String> details
) {}
