/*CSS*/
import "./styles.css";
//========================================================

/*IMPORTS*/
import Modal from "react-modal";
//========================================================

/*COMPONENTE*/
export default function ComponentModal(
{
 modalIsOpen,
 setModalIsOpen,
 actionString, 
 actionFunction, 
 isLoadingAction,
 setIsLoadingAction, 
 productToActUpon, 
 setProductToActUpon, 
 actionHappeningString
}) 
{
  return (
    <Modal 
     className="modal"
     isOpen={modalIsOpen}
     onRequestClose={() => setModalIsOpen(false)}
    >
      <h4 className="titleModal">Confirmação</h4>

      <p>Tem certeza que deseja {actionString} o produto?</p>

      <div className="modalButtons">
      <button
        className="buttonSim"
        onClick={async () => 
        {
         setIsLoadingAction(true);

         await actionFunction(productToActUpon);

         setIsLoadingAction(false);

         setModalIsOpen(false);

         setProductToActUpon(null);   
        }}
        disabled={isLoadingAction}
    >
        {isLoadingAction ? actionHappeningString + "..." : "Sim"}
    </button>
    <button
        className="buttonNao"
        onClick={() => 
        {
        setModalIsOpen(false);
        setProductToActUpon(null);
        }}
    >
        Não
    </button>
        </div>
    </Modal>
  );
}