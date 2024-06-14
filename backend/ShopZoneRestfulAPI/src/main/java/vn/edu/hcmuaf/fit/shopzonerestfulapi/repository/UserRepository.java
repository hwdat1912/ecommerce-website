package vn.edu.hcmuaf.fit.shopzonerestfulapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmuaf.fit.shopzonerestfulapi.model.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUsername(String username);
    Boolean existsByUsername(String username);
}