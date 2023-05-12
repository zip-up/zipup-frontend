export default {
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
    {
      title: 'Author',
      name: 'author',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      title: 'Photo',
      name: 'photo',
      type: 'image',
    },
    {
      title: 'Likes',
      name: 'likes',
      type: 'array',
      of: [{type: 'reference', to: {type: 'user'}}],
      validation: (Rule) => Rule.unique(),
    },
    {
      title: 'Comments',
      name: 'comments',
      type: 'array',
      of: [
        {
          name: 'comment',
          title: 'Comment',
          type: 'document',
          fields: [
            {title: 'Author', name: 'author', type: 'reference', to: [{type: 'user'}]},
            {title: 'Comment', name: 'comment', type: 'string'},
          ],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
  ],
  preview: {
    select: {
      title: 'comments.0.comment',
      authorName: 'author.name',
      authorUserName: 'author.username',
      media: 'photo',
    },
    prepare(selection) {
      const {title, authorName, authorUserName, media} = selection
      return {
        title: title,
        subtitle: `by ${authorName} (${authorUserName})`,
        media,
      }
    },
  },
}
