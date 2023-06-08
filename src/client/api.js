const cohortName = '2303-ftb-et-web-pt';
const baseUrl = `https://strangers-things.herokuapp.com/api/${cohortName}/posts`;

export const fetchPost = async (token) => {
    try {
        const response = await fetch(`${baseUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer${token}`
            },
            body: JSON.stringify({
                //come back this
            })
        });
        const result = await response.json();
        if (result.error) {
            throw result.error;
        }
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
};

fetchPost()