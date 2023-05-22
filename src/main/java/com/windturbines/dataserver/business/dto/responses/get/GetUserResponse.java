package com.windturbines.dataserver.business.dto.responses.get;

import com.windturbines.dataserver.entities.enums.Role;

public class GetUserResponse
{
    private Integer id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private Role role;
}
