import { graphql } from 'gatsby'

export const PosterImageClipFragment = graphql`
  fragment PosterImageClipFragment on node__clip {
    id
    title
    field_external_video_url {
      uri
      title
    }
    relationships {
      field_poster_image {
        localFile {
          publicURL
        }
      }
    }
    path{
      alias
    }
  }
`;

export const ArticleFragment = graphql`
  fragment ArticleFragment on node__article {
    title
    field_weight
    field_resource_weight
    field_is_additional_resource
    field_is_popular_resource
    field_short_version {
      processed
    }
    field_author {
      processed
    }
    field_article_summary {
      processed
    }
    relationships {
      field_main_image {
        localFile {
          publicURL
        }
      }
    }
    path{
      alias
    }
  }
`;

export const FullArticleFragment = graphql`
  fragment FullArticleFragment on node__article {
    __typename
    id
    field_weight
    field_resource_weight
    field_is_additional_resource
    field_is_popular_resource
    field_short_version {
      processed
    }
    field_article_summary {
      processed
    }
    field_old_article_discl {
      processed
    }
    field_author {
      processed
    }
    field_author_bio {
      processed
    }
    field_copyright {
      processed
    }
    title
    relationships {
      field_belongs_to_subtheme {
        id
        name
        path {
          alias
        }
        relationships {
          field_belongs_to_theme {
            id
            name
            path {
              alias
            }
          }
        }
      }
      field_article_related_content {
        __typename
        ... on node__faq {
          ...QAFragment
        }
        ... on node__clip {
          ...PosterImageClipFragment
        }
        ... on node__article {
          ...ArticleFragment
        }
        ... on node__interview {
          ...InterviewFragment
        }
        ... on node__quickfact {
          ...QuickfactWithRelatedContentFragment
        }
      }
      field_tags {
        name
        relationships {
          articles: backref_field_tags_node_article {
            ...ArticleFragment
          }
          qa: backref_field_tag_node_faq {
            ...QAFragment
          }
          clips: backref_field_t_node_clip {
            ...PosterImageClipFragment
          }
          interviews: backref_field_tags_node_interview {
            ...InterviewFragment
          }
        }
      }
      field_author_image {
        localFile {
          publicURL
          childImageSharp {
            id
            original {
              width
              height
              src
            }
            sizes {
              src
            }
            resolutions {
              height
              width
              src
            }
          }
        }
      }
      field_main_image {
        localFile {
          publicURL
          childImageSharp {
            id
            original {
              width
              height
              src
            }
            sizes {
              src
            }
            resolutions {
              height
              width
              src
            }
          }
        }
      }
      field_expert_reference{
        __typename
        ... on node__expert {
          ...ExpertFragment
        }        
      }
    }
    field_large_callout_text {
      processed
    }
    field_full_version {
      processed
    }
    path{
      alias
    }
  }
`;

export const ExternalResourceFragment = graphql`
fragment ExternalResourceFragment on node__external_resource {
  title
  field_weight
  field_resource_weight
  changed
  field_is_popular_resource
  field_overview {
    processed
  }
  field_link {
    uri
    title
  }
  relationships {
    field_main_image {
      localFile {
        publicURL
      }
    }
  }
  path{
    alias
  }
}
`

export const FullExternalResourceFragment = graphql`
fragment FullExternalResourceFragment on node__external_resource {
  title
  field_weight
  field_resource_weight
  changed
  field_is_popular_resource
  field_overview {
    processed
  }
  field_link {
    uri
    title
  }
  relationships {
    field_main_image {
      localFile {
        publicURL
      }
    }
  }
}
`


export const ExpertFragment = graphql`
  fragment ExpertFragment on node__expert {
    title
    changed
    field_overview {
      processed
    }
    field_title {
      processed
    }
    relationships {
      field_main_image {
        localFile {
          publicURL
        }
      }
    }
    path{
      alias
    }
  }
`

export const FullExpertFragment = graphql`
  fragment FullExpertFragment on node__expert {
    __typename
    title
    changed
    field_overview {
      processed
    }
    field_title {
      processed
    }
    relationships {
      field_main_image {
        localFile {
          publicURL
        }
      }
    }
    path{
      alias
    }
  }
`

export const InterviewFragment = graphql`
  fragment InterviewFragment on node__interview {
    title
    field_weight
    field_resource_weight
    changed
    field_is_additional_resource
    field_is_popular_resource
    field_interviewee_bio {
      processed
    }
    field_key_quote {
      processed
    }
    field_interview_summary {
      processed
    }
    relationships {
      field_interviewee {
        localFile {
          publicURL
        }
      }
    }
    path{
      alias
    }
  }
`

export const FullInterviewFragment = graphql`
  fragment FullInterviewFragment on node__interview {
    __typename
    title
    field_weight
    field_resource_weight
    changed
    field_is_additional_resource
    field_is_popular_resource
    field_interviewee_name {
      processed
    }
    field_interviewee_bio {
      processed
    }
    field_key_quote {
      processed
    }
    field_interview_summary {
      processed
    }
    field_full_length_version {
      processed
    }
    relationships {
      related_content: field_related_content_interview {
        __typename
        ... on node__faq {
          ...QAFragment
        }
        ... on node__clip {
          ...PosterImageClipFragment
        }
        ... on node__article {
          ...ArticleFragment
        }
        ... on node__interview {
          ...InterviewFragment
        }
      }
      field_which_subtheme_does_this_b {
        id
        name
        path {
          alias
        }
        relationships {
          field_belongs_to_theme {
            id
            name
            path {
              alias
            }
          }
        }
      }
      field_tags {
        name
        relationships {
          articles: backref_field_tags_node_article {
            ...ArticleFragment
          }
          qa: backref_field_tag_node_faq {
            ...QAFragment
          }
          clips: backref_field_t_node_clip {
            ...PosterImageClipFragment
          }
          interviews: backref_field_tags_node_interview {
            ...InterviewFragment
          }
        }
      }
      field_interviewee {
        localFile {
          publicURL
          childImageSharp {
            id
            original {
              width
              height
              src
            }
            sizes {
              src
            }
            resolutions {
              height
              width
              src
            }
          }
        }
      }
      field_expert_reference{
        __typename
        ... on node__expert {
          ...ExpertFragment
        }        
      }
    }
    path{
      alias
    }
  }
`

export const QAFragment = graphql`
  fragment QAFragment on node__faq {
    title
    field_belong_to_episode
    field_question_number
    field_expert_1 {
      value
      format
      processed
    }
    changed
    path{
      alias
    }
  }
`

export const FullQAFragment = graphql`
  fragment FullQAFragment on node__faq {
    __typename
    id
    title
    fields {
      slug
    }
    field_belong_to_episode
    field_question_number
    field_title {
      processed
    }
    field_question_summary {
      processed
    }
    field_expert_1 {
      processed
    }
    field_expert_2_answer {
      processed
    }
    field_expert_1_answer {
      processed
    }
    field_expert_4_answer {
      processed
    }
    relationships {
      field_belongs_to_subtheme {
        id
        name
        path {
          alias
        }
        relationships {
          field_belongs_to_theme {
            id
            name
            path {
              alias
            }
          }
        }
      }
      field_article_related_content : backref_field_article_related_content {
        __typename
        #... on node__faq {
        #  ...QAFragment
        #}
        #... on node__clip {
        #  ...PosterImageClipFragment
        #}
        ... on node__article {
          ...ArticleFragment
        }
        #... on node__quickfact {
        #  ...QuickfactWithRelatedContentFragment
        #}
      }
      field_tags: field_tag {
        name
        relationships {
          articles: backref_field_tags_node_article {
            ...ArticleFragment
          }
          qa: backref_field_tag_node_faq {
            ...QAFragment
          }
          clips: backref_field_t_node_clip {
            ...PosterImageClipFragment
          }
          interviews: backref_field_tags_node_interview {
            ...InterviewFragment
          }
        }
      }
      field_expert_1_reference {
        __typename
        ... on node__expert {
          ...ExpertFragment
        }
      }
      field_expert_2_reference {
        __typename
        ... on node__expert {
          ...ExpertFragment
        }
      }
      field_expert_3_reference {
        __typename
        ... on node__expert {
          ...ExpertFragment
        }
      }
      field_expert_4_reference {
        __typename
        ... on node__expert {
          ...ExpertFragment
        }
      }
    }
    path{
      alias
    }
  }
`

export const ClipFragment = graphql`
  fragment ClipFragment on node__clip {
    id
    field_weight
    field_episode
    title
    field_is_expert_connection
    field_external_video_url {
      uri
    }
    field_overview {
      processed
    }
    field_title_of_clip {
      processed
    }
     relationships {
      field_re {
        __typename
        ... on node__faq {
          ...QAFragment
        }
        ... on node__clip {
          ...PosterImageClipFragment
        }
        ... on node__article {
          ...ArticleFragment
        }
      }
      field_poster_image {
        localFile {
          publicURL
        }
      }
    }
    path{
      alias
    }
  }
`

export const FullClipFragment = graphql`
  fragment FullClipFragment on node__clip {
    __typename
    id
    field_weight
    field_episode
    title
    field_is_expert_connection
    field_external_video_url {
      uri
      title
    }
    field_overview {
      processed
    }
    field_title_of_clip {
      processed
    }
    relationships {
      field_poster_image {
        localFile {
          publicURL
          childImageSharp {
            id
            original {
              width
              height
              src
            }
            sizes {
              src
            }
            resolutions {
              height
              width
              src
            }
          }
        }
      }
      field_belongs_to_subtheme {
        id
        name
        path {
          alias
        }
        relationships {
          field_belongs_to_theme {
            id
            name
            path {
              alias
            }
          }
        }
      }
      field_tags: field_t {
        name
        relationships {
          articles: backref_field_tags_node_article {
            ...ArticleFragment
          }
          qa: backref_field_tag_node_faq {
            ...QAFragment
          }
          clips: backref_field_t_node_clip {
            ...PosterImageClipFragment
          }
          interviews: backref_field_tags_node_interview {
            ...InterviewFragment
          }
        }
      }
      field_article_related_content: field_re {
        __typename
        ... on node__faq {
          ...QAFragment
        }
        ... on node__clip {
          ...PosterImageClipFragment
        }
        ... on node__article {
          ...ArticleFragment
        }
      }
      field_poster_image {
        localFile {
          publicURL
          childImageSharp {
            id
            original {
              width
              height
              src
            }
            sizes {
              src
            }
            resolutions {
              height
              width
              src
            }
          }
        }
      }
    }
    path{
      alias
    }
  }
`

export const QuickfactWithRelatedContentFragment = graphql`
  fragment QuickfactWithRelatedContentFragment on node__quickfact {
    title
    field_quickfact {
      value
      format
      processed
      summary
    }
    relationships {
      field_related_content {
        __typename
        ... on node__faq {
          ...QAFragment
        }
        ... on node__clip {
          ...PosterImageClipFragment
        }
        ... on node__article {
          ...ArticleFragment
        }
      }
    }
  }
`

export const LessonPlanFragment = graphql`
  fragment LessonPlanFragment on node__lesson_plan {
    id
    field_weight
    field_resource_weight
    title
    field_is_popular_resource
    field_episode
    field_activity{
      processed
    }
    field_overview {
      processed
    }
    field_subjects {
      processed
    }
    field_objectives {
      processed
    }
    field_copyright_a {
      processed
    }
    field_description {
      processed
    }
    field_lesson_plan {
      processed
    }
    field_grade_levels {
      processed
    }
    field_lesson_summary {
      processed
    }
    field_time_allotment {
      processed
    }
    field_lesson_plan_author {
      processed
    }
    field_less_plan_author_bio {
      processed
    }
    field_subjects {
      processed
    }
    field_mat {
      processed
    }
    field_relevant_standards {
      processed
    }
    field_assessment {
      processed
    }
    field_additional_resources {
      processed
    }
    relationships {
      field_subject_tags {
        name
        relationships {
          articles: backref_field_tags_node_article {
            ...ArticleFragment
          }
          qa: backref_field_tag_node_faq {
            ...QAFragment
          }
          clips: backref_field_t_node_clip {
            ...PosterImageClipFragment
          }
          interviews: backref_field_tags_node_interview {
            ...InterviewFragment
          }
        }
      }
      field_main_image {
        localFile {
          publicURL
        }
      }
    }
    path{
      alias
    }
  }
`

export const EpisodeOneFragment = graphql`
  fragment EpisodeOneFragment on taxonomy_term__episode_one_page {
    id
    title: field_episode_one_title {
      processed
    }
    synopsis: field_episode_one_synopsis {
      processed
    }
    credits: field_episode_one_credits {
      processed
    }
    transcript: field_episode_one_transcript {
      processed
    }
    relationships {
      subthemes: field_explore_subthemes_related {
        name
        path{
          alias
        }
      }
    }
  }
`

export const EpisodeTwoFragment = graphql`
  fragment EpisodeTwoFragment on taxonomy_term__episode_two_page {
    id
    title: field_episode_two_ {
      processed
    }
    synopsis: field_episode_two_synopsis {
      processed
    }
    credits: field_episode_two_credits {
      processed
    }
    transcript: field_episode_two_transcript {
      processed
    }
    relationships {
      subthemes: field_explore_subthemes_re2 {
        name
        path{
          alias
        }
      }
    }
  }
`

export const EpisodeThreeFragment = graphql`
  fragment EpisodeThreeFragment on taxonomy_term__episode_three_page {
    id
    title: field_episode_three_title {
      processed
    }
    synopsis: field_episode_three_synopsis {
      processed
    }
    credits: field_episode_three_credits {
      processed
    }
    transcript: field_episode_three_ {
      processed
    }
    relationships {
      subthemes: field_explore_subthemes_re3 {
        name
        path{
          alias
        }
      }
    }
  }
`

export const AdditionalResourceFragment = graphql`
  fragment AdditionalResourceFragment on node__additional_resource {
    id
    field_resource_weight
    title
    field_link {
      uri
      title
    }
    relationships {
      field_main_image {
        localFile {
          publicURL
        }
      }
    }
    path{
      alias
    }
  }
`

export const HandoutFragment = graphql`
  fragment HandoutFragment on node__handout {
    id
    field_resource_weight
    title
    field_show_in_resources
    field_link {
      uri
      title
    }
    field_hand{
      processed
    }
    relationships {
      field_main_image {
        localFile {
          publicURL
        }
      }
    }
    path{
      alias
    }
  }
`