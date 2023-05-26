package com.windturbines.dataserver.api.controllers;

import com.windturbines.dataserver.business.abstracts.UserService;
import com.windturbines.dataserver.business.dto.requests.authenticate.AuthenticateUserRequest;
import com.windturbines.dataserver.business.dto.requests.create.CreateUserRequest;
import com.windturbines.dataserver.business.dto.requests.update.UpdateUserRequest;
import com.windturbines.dataserver.business.dto.responses.authentication.GetAuthenticationResponse;
import com.windturbines.dataserver.business.dto.responses.create.CreateUserResponse;
import com.windturbines.dataserver.business.dto.responses.get.GetAllUserResponse;
import com.windturbines.dataserver.business.dto.responses.update.UpdateUserResponse;
import com.windturbines.dataserver.entities.User;
import com.windturbines.dataserver.entities.enums.Role;
import com.windturbines.dataserver.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
public class UsersController
{
    private final UserService service;

    @GetMapping
    public List<GetAllUserResponse> getAll()
    {
        return service.getAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<CreateUserResponse> add(@RequestBody CreateUserRequest request)
    {
        return service.add(request);
    }

    @PutMapping("/{id}")
    public UpdateUserResponse update(@PathVariable("id") int id, @RequestBody UpdateUserRequest request)
    {
        return service.update(id, request);
    }

    @DeleteMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remove(@PathVariable("id") int id)
    {
        service.delete(id);
    }
}
