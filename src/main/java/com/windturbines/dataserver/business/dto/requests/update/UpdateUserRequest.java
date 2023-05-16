package com.windturbines.dataserver.business.dto.requests.update;

import com.windturbines.dataserver.entities.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class UpdateUserRequest
{
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private Role role;
}
