export default function Debug() {
  return (
    <div className="page-debug">
      <hr />
      Header texts follow
      <hr />

      <h1>
        Example of &lt;h1&gt;
      </h1>
      <h2>
        Example of &lt;h2&gt;
      </h2>
      <h3>
        Example of &lt;h3&gt;
      </h3>
      <h4>
        Example of &lt;h4&gt;
      </h4>
      <h5>
        Example of &lt;h5&gt;
      </h5>
      <h6>
        Example of &lt;h6&gt;
      </h6>

      <hr />
      Body texts follow
      <hr />

      <p>
        Example paragraph wrapped in &lt;p&gt;
      </p>
      <p>
        <b>Example bolded paragraph wrapped in &lt;p&gt; using &lt;b&gt;</b>
      </p>
      <p>
        <strong>Example bolded paragraph wrapped in &lt;p&gt; using &lt;strong&gt;</strong>
      </p>
      <p>
        <i>Example italicised paragraph wrapped in &lt;p&gt; using &lt;i&gt;</i>
      </p>
      <p>
        <em>Example italicised paragraph wrapped in &lt;p&gt; using &lt;em&gt;</em>
      </p>
      <p>
        <u>Example underlined paragraph wrapped in &lt;p&gt; using &lt;u&gt;</u>
      </p>
      <p>
        <code>Example code paragraph wrapped in &lt;p&gt; using &lt;code&gt;</code>
      </p>
      <p>
        <pre>Example code paragraph wrapped in &lt;p&gt; using &lt;pre&gt;</pre>
      </p>
      <p>
        <a href='https://gitlab.com/zephinzer/codepr.ac'>
          Example link paragraph wrapped in &lt;a&gt;
        </a>
      </p>

      <hr />
      Lists follow
      <hr />
      <ol>
        <li>Ordered list item</li>
        <li><b>Ordered list &lt;b&gt;olded item</b></li>
        <li><strong>Ordered list &lt;strong&gt; item</strong></li>
        <li><i>Ordered list &lt;i&gt; item</i></li>
        <li><em>Ordered list &lt;em&gt; item</em></li>
        <li><u>Ordered list &lt;u&gt; item</u></li>
        <li><code>Ordered list &lt;code&gt; item</code></li>
        <li><pre>Ordered list &lt;pre&gt; item</pre></li>
        <li>End of list items</li>
      </ol>
      <hr />
      <ul>
        <li>Unordered list item</li>
        <li><b>Unordered list &lt;b&gt;olded item</b></li>
        <li><strong>Unordered list &lt;strong&gt; item</strong></li>
        <li><i>Unordered list &lt;i&gt; item</i></li>
        <li><em>Unordered list &lt;em&gt; item</em></li>
        <li><u>Unordered list &lt;u&gt; item</u></li>
        <li><code>Unordered list &lt;code&gt; item</code></li>
        <li><pre>Unordered list &lt;pre&gt; item</pre></li>
        <li>End of list items</li>
      </ul>
    </div>
  )
}