package com.windturbines.dataserver.business.concretes;

import com.windturbines.dataserver.business.abstracts.UserService;
import com.windturbines.dataserver.business.dto.requests.create.CreateUserRequest;
import com.windturbines.dataserver.business.dto.requests.update.UpdateUserRequest;
import com.windturbines.dataserver.business.dto.responses.create.CreateUserResponse;
import com.windturbines.dataserver.business.dto.responses.get.GetAllUserResponse;
import com.windturbines.dataserver.business.dto.responses.update.UpdateUserResponse;
import com.windturbines.dataserver.business.rules.UserBusinessRules;
import com.windturbines.dataserver.entities.User;
import com.windturbines.dataserver.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service //once time of creation?
@AllArgsConstructor
public class UserManager implements UserService
{
    private final UserRepository repository;
    private final ModelMapper mapper;
    private final UserBusinessRules rules;

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
}
