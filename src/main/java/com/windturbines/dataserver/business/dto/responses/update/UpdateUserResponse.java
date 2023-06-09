package com.windturbines.dataserver.business.dto.responses.update;

import com.windturbines.dataserver.entities.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class UpdateUserResponse
{
    private int id;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private Role role;
}
