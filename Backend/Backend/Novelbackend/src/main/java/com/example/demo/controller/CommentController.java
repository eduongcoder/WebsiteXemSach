package com.example.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.request.CommentCreationRequest;
import com.example.demo.dto.request.CommentUpdateRequest;
import com.example.demo.dto.respone.ApiRespone;
import com.example.demo.dto.respone.ChapterRespone;
import com.example.demo.dto.respone.CommentRespone;
import com.example.demo.dto.respone.UserRespone;
import com.example.demo.service.CommentService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/comment")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class CommentController {
 
	CommentService commentService;
	

	
	
	@GetMapping("/getAllCommentOnChapter")
	public ApiRespone<List<CommentRespone>> getAllCommentOnChapter(@RequestParam String idChapter ) {
		return ApiRespone.<List<CommentRespone>>builder().result(commentService.getAllCommentByChapter(idChapter)).build();
	}
	
	@GetMapping("/getAllCommentOnNovel")
	public ApiRespone<List<CommentRespone>> getAllCommentOnNovel(@RequestParam String idNovel ) {
		return ApiRespone.<List<CommentRespone>>builder().result(commentService.getAllCommentByIdNovel(idNovel)).build();
	}
	
	@PostMapping("/createComment")
	public ApiRespone<CommentRespone> createComment(@RequestBody CommentCreationRequest request){
		return ApiRespone.<CommentRespone>builder().result(commentService.createComment(request)).build();
	}
	 
	@PutMapping("/updateComment")
	public ApiRespone<Optional<CommentRespone>> updateComment(@RequestBody CommentUpdateRequest request ){
		return ApiRespone.<Optional<CommentRespone>>builder().result(commentService.UpdateComment(request)).build();
	}
	
	@PutMapping("/likeComment")
	public ApiRespone<String> likeComment(@RequestParam String idComment  ){
		return ApiRespone.<String>builder().result(commentService.like(idComment)).build();
	}
	
	@PutMapping("/dislikeComment")
	public ApiRespone<String> dislikeComment(@RequestParam String idComment ){
		return ApiRespone.<String>builder().result(commentService.dislike(idComment)).build();
	}
	
	@DeleteMapping("/deleteComment")
	public ApiRespone<String> deleteComment(@RequestParam String idComment ){
		return ApiRespone.<String>builder().result(commentService.deleteComment(idComment)).build();
	} 
}
