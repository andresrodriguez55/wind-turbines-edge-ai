package com.windturbines.dataserver.business.concretes;

import com.windturbines.dataserver.business.abstracts.UserService;
import com.windturbines.dataserver.business.dto.requests.authenticate.AuthenticateUserRequest;
import com.windturbines.dataserver.business.dto.requests.create.CreateUserRequest;
import com.windturbines.dataserver.business.dto.requests.update.UpdateUserRequest;
import com.windturbines.dataserver.business.dto.responses.authentication.GetAuthenticationResponse;
import com.windturbines.dataserver.business.dto.responses.create.CreateUserResponse;
import com.windturbines.dataserver.business.dto.responses.get.GetAllUserResponse;
import com.windturbines.dataserver.business.dto.responses.get.GetUserResponse;
import com.windturbines.dataserver.business.dto.responses.update.UpdateUserResponse;
import com.windturbines.dataserver.business.rules.UserBusinessRules;
import com.windturbines.dataserver.configuration.security.filters.JwtService;
import com.windturbines.dataserver.entities.User;
import com.windturbines.dataserver.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service //once time of creation?
@AllArgsConstructor
public class UserManager implements UserService
{
    private final UserRepository repository;
    private final ModelMapper mapper;
    private final UserBusinessRules rules;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Override
    public GetAuthenticationResponse authenticate(AuthenticateUserRequest request)
    {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        rules.checkIfUserExistsByEmail(request.getEmail());
        User user = repository.findByEmail(request.getEmail());

        var jwtToken = jwtService.generateToken(user);

        GetAuthenticationResponse response =mapper.map(user, GetAuthenticationResponse.class);
        response.setToken(jwtToken);
        return response;
    }

    @Override
    public GetUserResponse getByEmail(String email)
    {
        rules.checkIfUserExistsByEmail(email);
        User user = repository.findByEmail(email);
        GetUserResponse response = mapper.map(user, GetUserResponse.class);
        return response;
    }
    @Override
    public List<GetAllUserResponse> getAll()
    {
        List<User> users = repository.findAll();
        List<GetAllUserResponse> responses = users
                .stream().map(history -> mapper.map(history, GetAllUserResponse.class)).toList();
        return responses;
    }

    @Override
    public CreateUserResponse add(CreateUserRequest request)
    {
        rules.checkIfUserNotExistsByEmail(request.getEmail());
        User user = mapper.map(request, User.class);
        user.setId(0);
        user.setPassword(getEncryptPassword(user.getPassword()));
        User savedUser = repository.save(user);
        CreateUserResponse response = mapper.map(savedUser, CreateUserResponse.class);
        return response;
    }

    @Override
    public UpdateUserResponse update(int id, UpdateUserRequest request)
    {
        rules.checkIfUserExists(id);
        rules.checkIfUserEmailMatch(id, request.getEmail());
        User user = mapper.map(request, User.class);
        user.setId(id);
        user.setPassword(getEncryptPassword(user.getPassword()));
        user.setRole(request.getRole());
        repository.save(user);
        UpdateUserResponse response = mapper.map(user, UpdateUserResponse.class);
        return response;
    }

    @Override
    public void delete(int id)
    {
        rules.checkIfUserExists(id);
        repository.deleteById(id);
    }

    private String getEncryptPassword(String password)
    {
        return passwordEncoder.encode(password);
    }
}
