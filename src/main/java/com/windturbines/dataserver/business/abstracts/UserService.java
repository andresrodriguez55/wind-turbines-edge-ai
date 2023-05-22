package com.windturbines.dataserver.business.abstracts;

import com.windturbines.dataserver.business.dto.requests.authenticate.AuthenticateUserRequest;
import com.windturbines.dataserver.business.dto.requests.create.CreateUserRequest;
import com.windturbines.dataserver.business.dto.requests.update.UpdateUserRequest;
import com.windturbines.dataserver.business.dto.responses.authentication.GetAuthenticationResponse;
import com.windturbines.dataserver.business.dto.responses.create.CreateUserResponse;
import com.windturbines.dataserver.business.dto.responses.get.GetAllUserResponse;
import com.windturbines.dataserver.business.dto.responses.get.GetUserResponse;
import com.windturbines.dataserver.business.dto.responses.update.UpdateUserResponse;

import java.util.List;

public interface UserService
{
    GetAuthenticationResponse authenticate(AuthenticateUserRequest request);
    GetUserResponse getByEmail(String email);
    List<GetAllUserResponse> getAll();
    CreateUserResponse add(CreateUserRequest request);
    UpdateUserResponse update(int id, UpdateUserRequest request);
    void delete(int id);
}
