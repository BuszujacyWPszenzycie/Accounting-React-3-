import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faPlus,
	faNoteSticky,
	faHandHoldingDollar,
	faCoins,
	faPiggyBank,
	faXmark,
} from '@fortawesome/free-solid-svg-icons'
import CenterMenuItem from './CenterMenuItem'
import { useState } from 'react'

export default function Center({ children }) {
	const [openMenu, setOpenMenu] = useState(false)
	const [listOfStickyNotes, setListOfStickyNotes] = useState([])

	const toggleMenu = () => {
		setOpenMenu(!openMenu)
	}

	function handleAddStickyNote() {
		const newStickyNote = {
			id: Math.random(),
			removeStickyNoteFunction: () => {},
		}

		const updatedListOfStickyNotes = [...listOfStickyNotes, newStickyNote]
		setListOfStickyNotes(updatedListOfStickyNotes)
	}

	const handleRemoveStickyNote = id => {
		const updatedListOfStickyNotes = listOfStickyNotes.filter(obj => obj.id !== id)
		setListOfStickyNotes(updatedListOfStickyNotes)
	}

	let showMenu = (
		<div className='center__menu'>
			<div className='center__menu--addWrapper' onClick={toggleMenu}>
				<FontAwesomeIcon icon={faPlus} className='center__menu--addIcon' />
			</div>
		</div>
	)

	if (openMenu) {
		showMenu = (
			<div className='center__menu'>
				<CenterMenuItem iconName={faNoteSticky} hoverTitle='Dodaj notatkę' onClick={handleAddStickyNote} />
				<CenterMenuItem iconName={faHandHoldingDollar} hoverTitle='Dodaj przychód'></CenterMenuItem>
				<CenterMenuItem iconName={faCoins} hoverTitle='Dodaj wydatek'></CenterMenuItem>
				<CenterMenuItem iconName={faPiggyBank} hoverTitle='Dodaj ZUS'></CenterMenuItem>
				<div className='center__menu--addWrapper' onClick={toggleMenu}>
					<FontAwesomeIcon icon={faPlus} className='center__menu--addIcon' />
				</div>
			</div>
		)
	}

	return (
		<section className='center'>
			<div className='center__shadow'></div>
			{listOfStickyNotes.map(id => (
				<div className='stickyNote__wrapper' key={id.id}>
					<div className='stickyNote__header'>
						<h3 className='stickyNote__title'>Notatka</h3>
						<FontAwesomeIcon
							icon={faXmark}
							id={id}
							className='stickyNote__icon'
							onClick={() => {
								handleRemoveStickyNote(id.id)
							}}
						/>
					</div>
					<textarea className='stickyNote__textarea'></textarea>
				</div>
			))}

			{showMenu}
		</section>
	)
}
