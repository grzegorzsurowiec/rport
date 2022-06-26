import{_ as s,r as i,o,c as l,a as e,b as n,e as t,d}from"./app.00ec766f.js";const r={},c=e("h1",{id:"vault",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#vault","aria-hidden":"true"},"#"),t(" Vault")],-1),u=e("p",null,"Rport provides a secure storage which allows to persist arbitrary data related to the clients and the environment. All data is stored encrypted so user can safely store passwords used for log in to remote systems there. Typical vault workflow looks as following:",-1),p=t("Administrator initialises vault by calling "),v={href:"https://petstore.swagger.io/?url=https://raw.githubusercontent.com/cloudradar-monitoring/rport/master/api-doc.yml#/Vault",target:"_blank",rel:"noopener noreferrer"},h=t("vault init api"),m=t(" and giving a password in input. RPort stores password in a secure place. From this moment Rport vault will remain unlocked and can accept requests for reading or changing data."),b=t("Administrator can lock vault by using "),g={href:"https://petstore.swagger.io/?url=https://raw.githubusercontent.com/cloudradar-monitoring/rport/master/api-doc.yml#/Vault",target:"_blank",rel:"noopener noreferrer"},f=t("vault lock api"),q=t(". RPort removes password and rejects all access requests to the vault. The same happens when server restarts. The vault database is persisted to hdd, so it will remain after server restarts. However, we would also recommend to back up the vault database additionally to survive also possible disk failures."),y=t("Administrator can unlock vault by using "),k={href:"https://petstore.swagger.io/?url=https://raw.githubusercontent.com/cloudradar-monitoring/rport/master/api-doc.yml#/Vault",target:"_blank",rel:"noopener noreferrer"},w=t("vault unlock api"),_=t(". He should provide password which he used on init stage. If a wrong password is provided, RPort will reject the vault access. In case of a correct password vault will be unlocked and can be used for reading or changing secure data."),x=t("Any authorized user can store new key value pairs by calling "),T={href:"https://petstore.swagger.io/?url=https://raw.githubusercontent.com/cloudradar-monitoring/rport/master/api-doc.yml#/Vault",target:"_blank",rel:"noopener noreferrer"},A=t("vault store api"),I=t("Any authorized user can list or search for stored vault entries by calling "),E={href:"https://petstore.swagger.io/?url=https://raw.githubusercontent.com/cloudradar-monitoring/rport/master/api-doc.yml#/Vault",target:"_blank",rel:"noopener noreferrer"},z=t("vault list api"),R=t("Any authorized user can get the stored secure value by provided id "),P={href:"https://petstore.swagger.io/?url=https://raw.githubusercontent.com/cloudradar-monitoring/rport/master/api-doc.yml#/Vault",target:"_blank",rel:"noopener noreferrer"},j=t("vault get api"),L=d(`<p>Any user belonging to the Administrators group can init, lock and unlock Vault. Any authorized user can read, store, delete values in an unlocked and initialized Vault. The only exception from this rule is if a value is stored with a non-empty <code>required_group</code> field, in this case the access will be allowed only to the users belonging to the specified <code>required_group</code> value.</p><h2 id="admin-api-usage" tabindex="-1"><a class="header-anchor" href="#admin-api-usage" aria-hidden="true">#</a> Admin API Usage</h2><p>The <code>/vault-admin</code> endpoints allow you to initialize, lock, unlock and read status of RPort vault.</p><h3 id="initialize" tabindex="-1"><a class="header-anchor" href="#initialize" aria-hidden="true">#</a> Initialize</h3><p>[Administrator access] This operation creates a new vault database and provisions it with some status information.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -X POST &#39;http://localhost:3000/api/v1/vault-admin/init&#39; \\
-u admin:foobaz \\
-H &#39;Content-Type: application/json&#39; \\
--data-raw &#39;{
	&quot;password&quot;: &quot;1234&quot;
}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Password length must be between 4 and 32 bytes, shorter and longer passwords are rejected.</p><p>You need to init database every time when the rport server is restarted.</p><h3 id="status" tabindex="-1"><a class="header-anchor" href="#status" aria-hidden="true">#</a> Status</h3><p>[Any user access] This API allows to read the current status of the RPort vault:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -X GET &#39;http://localhost:3000/api/v1/vault-admin&#39; \\
-u admin:foobaz \\
-H &#39;Content-Type: application/json&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The response will be</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{
    &quot;data&quot;: {
        &quot;init&quot;: &quot;setup-completed&quot;,
        &quot;status&quot;: &quot;unlocked&quot;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The <code>init</code> field shows the initialization status of the vault. <code>setup-completed</code> means that the vault is already initialized or <code>uninitialized</code> otherwise. The <code>status</code> field shows the lock status of the vault. It can be either <code>unlocked</code> or <code>locked</code>. <code>unlocked</code> status means that the vault is fully functional and can be used to store, read or modify data securely. <code>unlocked</code> status means that any access to vault database will be rejected till administrator unlocks it again.</p><h3 id="lock" tabindex="-1"><a class="header-anchor" href="#lock" aria-hidden="true">#</a> Lock</h3><p>[Administrator access] This operation locks the vault, meaning that the password will be removed from server&#39;s memory and vault won&#39;t accept any requests.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -X DELETE &#39;http://localhost:3000/api/v1/vault-admin/sesame&#39; \\
-u admin:foobaz \\
-H &#39;Content-Type: application/json&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="unlock" tabindex="-1"><a class="header-anchor" href="#unlock" aria-hidden="true">#</a> Unlock</h3><p>[Administrator access] This operation unlocks the vault. Administrator has to provide same password he used for the vault initialization. Rport will check the password validity and reject the request if a wrong password is provided. If administrator loses the password, all access to the data will be lost, so it should be kept in a secure place. If a correct password is provided, the vault will become fully functional.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -X POST &#39;http://localhost:3000/api/v1/vault-admin/sesame&#39; \\
-u admin:foobaz \\
-H &#39;Content-Type: application/json&#39; \\
--data-raw &#39;{
	&quot;password&quot;: &quot;1234&quot;
}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="user-api-usage" tabindex="-1"><a class="header-anchor" href="#user-api-usage" aria-hidden="true">#</a> User API Usage</h2><h3 id="list" tabindex="-1"><a class="header-anchor" href="#list" aria-hidden="true">#</a> List</h3><p>[Any user access] This API allows to list all entries with <code>id</code>, <code>client_id</code>, <code>created_by</code>, <code>created_at</code>, <code>key</code> fields but without the encrypted <code>value</code> field.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -X GET &#39;http://localhost:3000/api/v1/vault&#39; \\
-u admin:foobaz \\
-H &#39;Content-Type: application/json&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The response will be</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{
    &quot;data&quot;: [
        {
            &quot;id&quot;: 1,
            &quot;client_id&quot;: &quot;client123&quot;,
            &quot;created_by&quot;: &quot;admin&quot;,
            &quot;created_at&quot;: &quot;2021-05-18T09:26:10+03:00&quot;,
            &quot;key&quot;: &quot;one&quot;
        },
        {
            &quot;id&quot;: 2,
            &quot;client_id&quot;: &quot;client123&quot;,
            &quot;created_by&quot;: &quot;admin&quot;,
            &quot;created_at&quot;: &quot;2021-05-18T09:30:27+03:00&quot;,
            &quot;key&quot;: &quot;two&quot;
        }
    ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sort" tabindex="-1"><a class="header-anchor" href="#sort" aria-hidden="true">#</a> Sort</h3><p>You can sort entries by <code>id</code>, <code>client_id</code>, <code>created_by</code>, <code>created_at</code>, <code>key</code> fields:</p><p>e.g. <code>http://localhost:3000/api/v1/vault?sort=created_at</code> - gives you entries sorted by date of creation in ascending order.</p><p>To change the sorting order by adding <code>-</code> to a field name. e.g. <code>http://localhost:3000/api/v1/vault?sort=-created_at</code> - gives you entries sorted by date of creation where the newest entries will be listed first.</p><p>You can sort by multiple fields and any combination of sort directions: e.g. <code>http://localhost:3000/api/v1/vault?sort=client_id&amp;sort=-created_at</code> - gives you entries sorted by key. If multiple entries have same <code>client_id</code>, they will be sorted by date of creation in descending order.</p><h3 id="filter" tabindex="-1"><a class="header-anchor" href="#filter" aria-hidden="true">#</a> Filter</h3><p>You can filter entries by <code>id</code>, <code>client_id</code>, <code>created_by</code>, <code>created_at</code>, <code>key</code> fields:</p><p><code>http://localhost:3000/api/v1/vault?filter[key]=one</code> will list you entries with the key=one.</p><p>Note: If you use curl to test filters, you should switch off URL globbing parser by providing <code>-g</code> flag (see curl documentation for the details), e.g.:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -g -X GET &#39;http://localhost:3000/api/v1/vault?filter[created_by]=admin&#39; \\
-u admin:foobaz \\
-H &#39;Content-Type: application/json&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You can combine filters for multiple fields: <code>http://localhost:3000/api/v1/vault?filter[client_id]=client123&amp;filter[created_by]=admin</code> - gives you list of entries for client <code>client123</code> and created by <code>admin</code></p><p>You can also specify multiple filter values e.g. <code>http://localhost:3000/api/v1/vault?filter[client_id]=client123,client3</code> - gives you list of entries for client <code>client123</code> or <code>client3</code></p><p>You can also combine both sort and filter queries in a single request:</p><p><code>http://localhost:3000/api/v1/vault?sort=created_at&amp;filter[client_id]=client123</code> - gives you entries for client <code>client123</code> sorted by <code>created_at</code> in order of creation.</p><p><em>Filters based on DateTime columns are not implemented at the moment.</em></p><h3 id="read-a-secured-value" tabindex="-1"><a class="header-anchor" href="#read-a-secured-value" aria-hidden="true">#</a> Read a secured value</h3><p>You can get a single document with all fields and the decrypted value.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -X GET &#39;http://localhost:3000/api/v1/vault/1&#39; \\
-u admin:foobaz \\
-H &#39;Content-Type: application/json&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The response will be</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{
    &quot;data&quot;: {
        &quot;client_id&quot;: &quot;client123&quot;,
        &quot;required_group&quot;: &quot;&quot;,
        &quot;key&quot;: &quot;three&quot;,
        &quot;value&quot;: &quot;345&quot;,
        &quot;type&quot;: &quot;secret&quot;,
        &quot;id&quot;: 1,
        &quot;created_at&quot;: &quot;2021-05-18T09:46:07+03:00&quot;,
        &quot;updated_at&quot;: &quot;2021-05-18T09:46:07+03:00&quot;,
        &quot;created_by&quot;: &quot;admin&quot;,
        &quot;updated_by&quot;: &quot;admin&quot;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In the &quot;value&quot; field you will find the decrypted secure value. If <code>required_group</code> value of the stored vault entry is not empty, only users of this group can read this value, e.g. if <code>required_group</code> = &#39;Administrators&#39; and the current user doesn&#39;t belong to this group, an error will be returned.</p><h3 id="add-a-new-secured-value" tabindex="-1"><a class="header-anchor" href="#add-a-new-secured-value" aria-hidden="true">#</a> Add a new secured value</h3><p>You can create a new secured value:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -X POST &#39;http://localhost:3000/api/v1/vault&#39; \\
-u admin:foobaz \\
-H &#39;Content-Type: application/json&#39; \\
--data-raw &#39;{
	&quot;client_id&quot;: &quot;client3&quot;,
	&quot;required_group&quot;: &quot;&quot;,
	&quot;key&quot;: &quot;four&quot;,
	&quot;value&quot;: &quot;4&quot;,
	&quot;type&quot;: &quot;string&quot;
}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The response will contain the id of the added element, which you can use then in the read value, deletion or changing APIs:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{
    &quot;data&quot;: {
        &quot;id&quot;: 5
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Fields info:</p><p><code>client_id</code>: text, optional, Used to tie a document to a specific client where 0 means the document can be accessed from any client.</p><p><code>required_group</code>: text, optional, if filled, users not belonging to this group are not allowed to store or read the decrypted value.</p><p><code>key</code>: text, required, some string to identify the document</p><p><code>value</code>: text, required representing the encrypted &quot;body&quot; of the document. All other columns hold clear text values. This column stores the encrypted data.</p><p><code>type</code>: text, required ENUM(&#39;text&#39;, &#39;secret&#39;, &#39;markdown&#39;, &#39;string&#39;) Type of the secret value.</p><h3 id="change-a-vault-entry" tabindex="-1"><a class="header-anchor" href="#change-a-vault-entry" aria-hidden="true">#</a> Change a vault entry</h3><p>You need to provide all fields like those you used to create a vault entry. Partial updates are not supported. Additionally, you need to provide <code>id</code> of a stored value in the request url. You can get it by using the listing API. You get the id also when you store a new value.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -X PUT &#39;http://localhost:3000/api/v1/vault/1&#39; \\
-u admin:foobaz \\
-H &#39;Content-Type: application/json&#39; \\
--data-raw &#39;{
	&quot;client_id&quot;: &quot;client3&quot;,
	&quot;required_group&quot;: &quot;&quot;,
	&quot;key&quot;: &quot;four&quot;,
	&quot;value&quot;: &quot;4&quot;,
	&quot;type&quot;: &quot;string&quot;
}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The response will contain the id of the added element:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{
    &quot;data&quot;: {
        &quot;id&quot;: 1
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>If <code>required_group</code> value of the entry you want to change is not empty, only users of this group can change this value, otherwise an error will be returned.</p><h3 id="delete-a-vault-entry" tabindex="-1"><a class="header-anchor" href="#delete-a-vault-entry" aria-hidden="true">#</a> Delete a vault entry</h3><p>To delete a vault entry, you need to provide id of an existing vault entry. You can get it by listing vault keys. Additionally, id is provided when you create a new vault entry. You can delete a vault entry by calling the following API:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>curl -X DELETE &#39;http://localhost:3000/api/v1/vault/1&#39; \\
-u admin:foobaz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>If <code>required_group</code> value of the entry you want to delete is not empty, only users of this group can change this value, otherwise an error will be returned.</p><h2 id="create-clear-text-backups-of-the-vault" tabindex="-1"><a class="header-anchor" href="#create-clear-text-backups-of-the-vault" aria-hidden="true">#</a> Create clear text backups of the vault</h2><p>If you lose the passphrase of the vault, accessing the data is not possible anymore. A lost password can only be recovered by so-called brute-force password probing.</p><p>Consider creating clear-text backups of the vault. Backups are performed via the API. You need a user of the Administrator group and an API token for that user.</p><p>Below you find a simple script that dumps all entries of the vault to json text files.</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token assign-left variable"><span class="token environment constant">USER</span></span><span class="token operator">=</span>admin
<span class="token assign-left variable">TOKEN</span><span class="token operator">=</span>e83d40e4-e237-43d6-bb99-35972ded631b
<span class="token assign-left variable">URL</span><span class="token operator">=</span>http://localhost:3000/api/v1/vault

<span class="token comment"># Get all vault document ids</span>
<span class="token assign-left variable">FOLDER</span><span class="token operator">=</span>./vault-backup
<span class="token function">mkdir</span> <span class="token variable">\${FOLDER}</span>
<span class="token assign-left variable">IDS</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> -s -u $<span class="token punctuation">{</span><span class="token environment constant">USER</span><span class="token punctuation">}</span>:$<span class="token punctuation">{</span>TOKEN<span class="token punctuation">}</span> $<span class="token punctuation">{</span>URL<span class="token punctuation">}</span><span class="token operator">|</span>jq .data<span class="token punctuation">[</span><span class="token punctuation">]</span>.id<span class="token variable">)</span></span>
<span class="token comment"># Iterate over list of document ids</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">ID</span> <span class="token keyword">in</span> <span class="token variable">$IDS</span><span class="token punctuation">;</span> <span class="token keyword">do</span> 
  <span class="token function">curl</span> -s -u <span class="token variable">\${<span class="token environment constant">USER</span>}</span><span class="token builtin class-name">:</span><span class="token variable">\${TOKEN}</span> <span class="token variable">\${URL}</span>/<span class="token variable">\${ID}</span> -o <span class="token variable">\${FOLDER}</span>/<span class="token variable">\${ID}</span>.json
<span class="token keyword">done</span>
<span class="token comment"># Pack and compress</span>
<span class="token function">tar</span> czf vault-backup.tar.gz <span class="token variable">\${FOLDER}</span>
<span class="token comment"># Securely delete exported files</span>
<span class="token function">find</span> <span class="token variable">\${FOLDER}</span> -type f -exec shred <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">\\</span><span class="token punctuation">;</span>
<span class="token function">rm</span> -rf <span class="token variable">\${FOLDER}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,73);function D(Y,$){const a=i("ExternalLinkIcon");return o(),l("div",null,[c,u,e("ul",null,[e("li",null,[e("p",null,[p,e("a",v,[h,n(a)]),m])]),e("li",null,[e("p",null,[b,e("a",g,[f,n(a)]),q])]),e("li",null,[e("p",null,[y,e("a",k,[w,n(a)]),_])]),e("li",null,[e("p",null,[x,e("a",T,[A,n(a)])])]),e("li",null,[e("p",null,[I,e("a",E,[z,n(a)])])]),e("li",null,[e("p",null,[R,e("a",P,[j,n(a)])])])]),L])}var V=s(r,[["render",D],["__file","no13-vault.html.vue"]]);export{V as default};