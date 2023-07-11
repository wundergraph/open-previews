# Installation instructions

1. Install the [Open Previews app](https://github.com/apps/open-previews) in your Github organization and give access to the repositories you want to enable commenting for.

2. If you haven't done so already, enable discussions in your repository.
You can enable this by going to your repository settings page and make sure that the `Discussions` feature is checked.

3. Add a new category to your repository's discussions called "Previews Comments". This is where the comments will be posted. 
It's best to use the `Announcement` category type for this, so people can't post new discussions in this category.

You can manage your categories by going to `Discussions` in your repository and clicking on the `Edit` button next to `Categories`.

4. Include the widget in your website or application.

```html
<script id="open-previews" data-repository="wundergraph/open-previews" data-category-id="DIC_kwDOJcC98c4CXtym" src="https://openpreviews.com/widget.js" />
```

Replace the `data-repository` attribute with the repository you want to enable commenting for.

Replace the `data-category-id` attribute with the category id of the category you created in step 3.
You can find the category id by going to the [Github API explorer](https://docs.github.com/en/graphql/overview/explorer).

Log in and run the following query:

```graphql
query GetCategory {
  github_repository(name: "your-repository-name", owner: "your-org") {
    discussionCategory(slug: "preview-comments") {
      id
    }
  }
}
```


