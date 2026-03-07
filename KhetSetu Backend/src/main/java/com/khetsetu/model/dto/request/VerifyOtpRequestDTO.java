package com.khetsetu.model.dto.request;

import lombok.Data;

@Data
public class VerifyOtpRequestDTO {
    private String mobile;
    private String otp;
}