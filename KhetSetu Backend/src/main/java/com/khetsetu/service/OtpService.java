package com.khetsetu.service;

import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {
    private final ConcurrentHashMap<String, OtpEntry> otpStorage = new ConcurrentHashMap<>();
    private static final long OTP_EXPIRY_MINUTES = 10;

    public String generateOtp(String mobile) {
        String otp = String.valueOf((int) (Math.random() * 900000) + 100000);
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(OTP_EXPIRY_MINUTES);
        otpStorage.put(mobile, new OtpEntry(otp, expiry));
        System.out.println("OTP for " + mobile + " is: " + otp);
        return otp;
    }

    public boolean validateOtp(String mobile, String otp) {
        OtpEntry entry = otpStorage.get(mobile);
        if (entry == null) return false;
        if (entry.expiry().isBefore(LocalDateTime.now())) {
            otpStorage.remove(mobile);
            return false;
        }
        boolean valid = entry.otp().equals(otp);
        if (valid) otpStorage.remove(mobile);
        return valid;
    }

    private record OtpEntry(String otp, LocalDateTime expiry) {}
}