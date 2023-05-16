package com.windturbines.dataserver.business.dto.responses.get;

import com.windturbines.dataserver.entities.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GetAllUserResponse
{
    private Integer id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private Role role;
}
