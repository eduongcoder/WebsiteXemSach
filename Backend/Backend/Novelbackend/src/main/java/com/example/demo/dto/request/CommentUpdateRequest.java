package com.example.demo.dto.request;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommentUpdateRequest {
	String idComment;
	int likeComment;
	int dislikeComment;
	String content_Comment;

	boolean reviewStatusComment;

	String idChapter;

	String idUser; 
}
