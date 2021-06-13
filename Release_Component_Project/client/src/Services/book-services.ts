import axios from 'axios'

class BookServices{

    getAllBooks=async ()=>{
        let response =await axios.get('http://localhost:8000/api/books')
        return response;
    }

    getBookById=async (bookId:any)=>{
        console.log(`bookId`, bookId)
        let response =await axios.get(`http://localhost:8000/api/books/${bookId}`)
        console.log(`response`, response)
        return response;
    }

    addUserReview=async (review:any,token:any)=>{
        let response =await axios.put('http://localhost:8000/api/books/review',review,
        {
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        return response;
    }

    getReviewForABook=async (bookId:any,token:any)=>{
        let response =await axios.get(`http://localhost:8000/api/books/review/${bookId}`,
        {
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        return response;
    }

    getAuthorDetails=async (authorName : any)=>{
        console.log(`authorName`, authorName)
        let response =await axios.get(`http://localhost:8000/api/author/name/${authorName}`)
        return response;
    }

    adminAddBook=async (newBook:any,token:any)=>{
        let response =await axios.post(`http://localhost:8000/api/books`,newBook,
        {
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        return response;
    }

    adminUpdateBook=async (bookId:any,bookDetails:any,token:any)=>{
        let response =await axios.put(`http://localhost:8000/api/books/${bookId}`,bookDetails,
        {
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        return response;
    }

    adminDeleteBook=async (bookId:any,token:any)=>{
        let response =await axios.delete(`http://localhost:8000/api/books/${bookId}`,
        {
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        return response;
    }

    searchBooks=async (searchBy:any,searchInput:any)=>{
        let response 
        switch(searchBy){
            case 'title':
                response =await axios.get(`http://localhost:8000/api/books/title/${searchInput}`)
                return response;
            case 'author':
                response =await axios.get(`http://localhost:8000/api/books/by/${searchInput}`)
                return response;
            case 'rating':
                response =await axios.get(`http://localhost:8000/api/books/rating/${searchInput}`)
                return response; 
            case 'tag':
                response =await axios.get(`http://localhost:8000/api/books/tag/${searchInput}`)
                return response;
            case 'price':
                let price=searchInput.split('-')
                response =await axios.get(`http://localhost:8000/api/books/price/min/${price[0]}/max/${price[1]}`)
                return response;
        }
    }

}

export default BookServices;