import { useContext,Fragment } from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../component/category-preview/category-preview.component";
import { selectCategoriesMap,selectCategoriesIsLoading } from "../../store/categories/categories.selector";
import Spinner from "../../component/spinner/spinner.component";

const CategoriesPreview = () => {
  //const { categoriesMap } = useContext(CategoriesContext);
 const categoriesMap = useSelector(selectCategoriesMap)
 const isLoading = useSelector(selectCategoriesIsLoading)
  return (
    <Fragment>
      {
        isLoading ? ( <Spinner /> ) : (
          Object.keys(categoriesMap).map((title) => {
            const products=categoriesMap[title]
            return <CategoryPreview key={title} title={title} products={products} />
          })
        )
      }
    </Fragment>
  );
};

export default CategoriesPreview;
