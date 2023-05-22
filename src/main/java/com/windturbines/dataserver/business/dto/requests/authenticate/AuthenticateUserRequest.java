package com.windturbines.dataserver.business.dto.requests.authenticate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class AuthenticateUserRequest
{
    private String email;
    private String password;
}
