package org.sakharov.product.montagecore.controller;

import com.sun.tools.jconsole.JConsoleContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sakharov.product.montagecore.domain.dto.ClientContactDto;
import org.sakharov.product.montagecore.domain.dto.UpdateProfileDto;
import org.sakharov.product.montagecore.domain.dto.WorkerContactDto;
import org.sakharov.product.montagecore.domain.dto.ProfileDto;
import org.sakharov.product.montagecore.domain.dto.SelectWorkerDto;
import org.sakharov.product.montagecore.domain.entity.UserEntity;
import org.sakharov.product.montagecore.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
public class UserController {
    private final ProfileService profileService;

    @GetMapping("/profile_client")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProfileDto> getProfileInfo(Long userId){ return ResponseEntity.ok(profileService.getProfileInfo(userId));}

    @GetMapping("/my_profile")
    @PreAuthorize("hasAnyRole('USER', 'WORKER')")
    public ResponseEntity<ProfileDto> getProfileInfo() {
        final UserEntity user = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        final ProfileDto profileDto = profileService.getProfileInfo(user.getId());
        return ResponseEntity.ok(profileDto);
    }
    @GetMapping("/all_clients_info")
    @PreAuthorize("hasRole('ADMIN')")
    public List<ClientContactDto> getAllClients(){return ResponseEntity.ok(profileService.getAllClients()).getBody();}
    @GetMapping("/all_workers_info")
    @PreAuthorize("hasRole('ADMIN')")
    public List<WorkerContactDto> getAllWorkers(){return ResponseEntity.ok(profileService.getAllWorkers()).getBody();}

    @GetMapping("/select_workers")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<SelectWorkerDto>> getSelectWorkers(){return ResponseEntity.ok(profileService.getSelectWorkers());}

    @GetMapping("/user_contact")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<ClientContactDto> getContact(@RequestParam("user_id") final Long userId){
        return ResponseEntity.ok(profileService.getContact(userId));
    }

    @GetMapping("/worker_contact")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<WorkerContactDto> getWorkerContact(@RequestParam("worker_id") final Long workerId){
        return ResponseEntity.ok(profileService.getWorkerContact(workerId));
    }

    @PostMapping("/update_profile")
    @PreAuthorize("hasAnyRole('USER','WORKER')")
    public ResponseEntity<Void> getUpdateInfo(@RequestBody UpdateProfileDto dto) {
        final UserEntity user = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        profileService.updateProfileInfo(dto, user.getId());
        return ResponseEntity.ok().build();
    }
}
