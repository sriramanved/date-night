export const datenightData = `
<url>
<loc>https://date-night-three.vercel.app/</loc>
<content>
    <feature>
        <name></name>
        <desc>A button on the right of the feed to create a community.</desc>
    </feature>
</content>
<desc>A place to find date night ideas. This is where you can view your personalized post feed based on the communities you are subscribed to if you are signed in, and a general post feed if you are not signed in.</desc>
</url>

<url>
<loc>https://date-night-three.vercel.app/sign-in</loc>
<desc>A sign in page</desc>
</url>

<url>
<loc>https://date-night-three.vercel.app/r/[slug]</loc>
<desc>A specific community's page</desc>
<content>
    <posts>
    <desc>Several posts sorted by most recently posted to subcommunity r/[slug]</desc>
    </posts>
</content>
</url>

<url>
<loc>https://date-night-three.vercel.app/r/[slug]/submit</loc>
<desc>A page to create a post for a specific community</desc>
</url>

<url>
<loc>https://date-night-three.vercel.app/r/[slug]/[post_id]</loc>
<desc>A specific post's page</desc>
<content>
    <comments>
    <desc>Several comments sorted by most recently posted to post [post_id]</desc>
    </comments>

    <comment-form>
    <desc>A form to create a comment for post [post_id]</desc>
    </comment-form>

    <post>
    <desc>Post [post_id]</desc>
    </post>
</content>
</url>

<url>
<loc>https://date-night-three.vercel.app/places</loc>
<desc>A page to search for places to go on a date</desc>
</url>

<url>
<loc>https://date-night-three.vercel.app/places/events</loc>
<desc>A page to search for events to go to on a date</desc>
</url>





`;
