package com.windturbines.dataserver.business.dto.responses.authentication;

import com.windturbines.dataserver.entities.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GetAuthenticationResponse
{
    private String token;
    private String email;
    private String firstName;
    private String lastName;
    private Role role;
}
