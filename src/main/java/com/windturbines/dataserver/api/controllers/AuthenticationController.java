package com.windturbines.dataserver.api.controllers;

import com.windturbines.dataserver.business.abstracts.UserService;
import com.windturbines.dataserver.business.dto.requests.authenticate.AuthenticateUserRequest;
import com.windturbines.dataserver.business.dto.responses.authentication.GetAuthenticationResponse;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/authentication")
@AllArgsConstructor
public class AuthenticationController
{
    private final UserService service;

    @PostMapping
    public GetAuthenticationResponse authenticate(@RequestBody AuthenticateUserRequest request)
    {
        return service.authenticate(request);
    }
}
