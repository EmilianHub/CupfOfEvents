package com.cupofevents.infrastructure.mapper;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class RedisKeyMapper {

    public static String from(String prefix, String suffix) {
        return String.format(prefix, suffix.toLowerCase().trim());
    }

    public static String from(String pattern, List<String> patternKeys) {
        return String.format(pattern, patternKeys.stream()
                .map(String::toLowerCase)
                .toArray());
    }
}
