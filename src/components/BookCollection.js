import React, { useEffect, useMemo, useCallback } from "react"
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import BookCollectionSkeleton from "./BookCollectionSkeleton";
import BookCollectionCard from "./BookCollectionCard";
import { getCollection } from "../reducers/bookReducer";
import { useInView } from "react-intersection-observer";

const BookCollection = ({ genreName }) => {

const { bookCollection, collectionLoading } = useSelector(
  (state) => ({
    bookCollection: state.book.bookCollection[genreName],
    collectionLoading: state.book.collectionLoading[genreName]
  }),
  shallowEqual
);

const { library } = useSelector((state) => state.library)

const maxResults = 12;

const dispatch = useDispatch()

const [ref, inView] = useInView({
  threshold: 0.2,
  triggerOnce: true,
})

useEffect(() => {
  if(inView) {
    dispatch(getCollection({genreName, maxResults}));
  }
}, [dispatch, genreName, inView]);

  return (
    <div ref={ref} className="bookcollection">
      {!inView || collectionLoading|| !bookCollection ? 
        <BookCollectionSkeleton /> : (
        <div className="bookcollection-container">
          <div className="bookcollection-container-header">
            <h1>Trending in {genreName}</h1>
          </div>
          <Swiper
            slidesPerView={'auto'}
            cssMode={true}
            navigation={true}
            modules={[Navigation]}
            spaceBetween={24}
            style={{ paddingLeft: '20px', paddingRight: '20px' }}
            className="bookcollection-container-swiper"
          >
            <div className="bookcollection-container-swiper-block-left"></div>
            <div className="bookcollection-container-swiper-block-right"></div>
            {bookCollection?.map((book) => (
              <SwiperSlide key={book._id}>
                <BookCollectionCard book={book} isSaved={library?.books?.some(item => item._id === book._id)}/>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default BookCollection