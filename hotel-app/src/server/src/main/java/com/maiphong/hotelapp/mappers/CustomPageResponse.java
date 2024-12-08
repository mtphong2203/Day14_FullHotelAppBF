package com.maiphong.hotelapp.mappers;

import java.util.Collection;

import org.springframework.hateoas.Links;
import org.springframework.hateoas.PagedModel;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomPageResponse<T> {
    private Collection<T> data;

    private PagedModel.PageMetadata page;

    private Links links;
}
