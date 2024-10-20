const formatResponse = (response: string) => {
    return response
        // Format headings (### for h2, #### for h3)
        .replace(/### (.+)/g, '<h2 class="font-bold text-lg mt-4 mb-2">$1</h2>') // Format h2 headings
        .replace(/#### (.+)/g, '<h3 class="font-bold text-md mt-3 mb-1">$1</h3>') // Format h3 subheadings

        // Format bold text (e.g., **bold text**)
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Format bold text

        // Format bullet points (e.g., "- bullet point")
        .replace(/- (.+)/g, '<li class="list-disc ml-6">$1</li>') // Format bullet points

        // Format links (e.g., [text](url))
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" class="text-blue-700 underline">$1</a>') // Format links

        // Convert new lines (\n) into line breaks (<br/>)
        .replace(/\n/g, '<br/>'); // Line breaks for new lines
};

export default formatResponse;
