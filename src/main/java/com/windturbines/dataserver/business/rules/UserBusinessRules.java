package com.windturbines.dataserver.business.rules;

import com.windturbines.dataserver.common.constants.Messages;
import com.windturbines.dataserver.core.exceptions.BusinessException;
import com.windturbines.dataserver.entities.User;
import com.windturbines.dataserver.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserBusinessRules
{
    private final UserRepository repository;

    public void checkIfUserNotExistsByEmail(String email)
    {
        if(repository.existsByEmail(email))
        {
            throw new BusinessException(Messages.User.EmailExists);
        }
    }

    public void checkIfUserEmailMatch(int id, String email)
    {
        User user = repository.findById(id).orElseThrow();
        if(!user.getEmail().equals(email))
        {
            throw new BusinessException(Messages.User.EmailNotMatch);
        }
    }

    public void checkIfUserExists(int id)
    {
        if(!repository.existsById(id))
        {
            throw new BusinessException(Messages.User.NotExists);
        }
    }

    public void checkIfUserExistsByEmail(String email)
    {
        if(!repository.existsByEmail(email))
        {
            throw new BusinessException(Messages.User.NotExists);
        }
    }

    public void checkIfUserExistsByEmailAndPassword(String email, String password)
    {
        if(!repository.existsByEmailAndPassword(email, password))
        {
            throw new BusinessException(Messages.User.NotExists);
        }
    }
}
