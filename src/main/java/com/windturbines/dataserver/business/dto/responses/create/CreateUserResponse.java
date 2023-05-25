package com.windturbines.dataserver.business.dto.responses.create;

import com.windturbines.dataserver.entities.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class CreateUserResponse
{
    private String email;
    private String firstName;
    private String lastName;
    private Role role;
}
