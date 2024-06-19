package vn.edu.hcmuaf.fit.shopzonerestfulapi.controller.auth;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.fit.shopzonerestfulapi.dto.request.ChangePasswordRequest;
import vn.edu.hcmuaf.fit.shopzonerestfulapi.dto.request.ForgotPasswordRequest;
import vn.edu.hcmuaf.fit.shopzonerestfulapi.dto.request.UpdateUserRequest;
import vn.edu.hcmuaf.fit.shopzonerestfulapi.dto.request.UpgradeToSellerRequest;
import vn.edu.hcmuaf.fit.shopzonerestfulapi.dto.response.ApiResponse;
import vn.edu.hcmuaf.fit.shopzonerestfulapi.model.auth.UserEntity;
import vn.edu.hcmuaf.fit.shopzonerestfulapi.service.auth.UserService;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PutMapping("/update")
    public ApiResponse<UserEntity> update(Authentication authentication, @RequestBody UpdateUserRequest updateUserRequest) {
            return userService.updateUser(authentication, updateUserRequest);
    }

    @PutMapping("/upgradeToSeller")
    @PreAuthorize("hasRole('USER')")
    public ApiResponse<UserEntity> upgradeToSeller(Authentication authentication, @RequestBody UpgradeToSellerRequest upgradeToSellerRequest) {
            return userService.upgradeToSeller(authentication, upgradeToSellerRequest);
    }

    @DeleteMapping("/delete")
    public ApiResponse<UserEntity> delete(Authentication authentication) {
            return userService.deleteUser(authentication);
    }

    @PutMapping("/changePassword")
    public ApiResponse<UserEntity> changePassword(Authentication authentication, @RequestBody ChangePasswordRequest changePasswordRequest) {
            return userService.changePassword(authentication, changePasswordRequest);
    }

    @PostMapping("/forgotPassword")
    public ApiResponse<UserEntity> forgotPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest) throws MessagingException {
            return userService.forgotPassword(forgotPasswordRequest);
    }

    @GetMapping("/info")
    public ApiResponse<UserEntity> getUserInfo(Authentication authentication) {
            return userService.getUserInfo(authentication);
    }
}