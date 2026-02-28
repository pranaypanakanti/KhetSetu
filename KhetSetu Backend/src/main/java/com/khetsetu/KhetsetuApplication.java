package com.khetsetu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement

public class KhetsetuApplication {

	public static void main(String[] args) {
		SpringApplication.run(KhetsetuApplication.class, args);
	}

}
