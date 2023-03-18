<script>
	import { Add, Checkmark, Edit, Save, TrashCan } from 'carbon-icons-svelte';
	import ShowOnAlt from '$lib/components/ShowOnAlt.svelte';
</script>

<!--
 Copyright (c) 2023 Patsagorn Y.
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->
<svelte:head>
	<title>คู่มือการใช้งานสำหรับร้านค้า</title>
</svelte:head>

<div
	class="prose prose-indigo prose-indigo-dark max-w-xl m-auto 
  prose-h1:text-3xl prose-h1:mt-4 prose-h1:mb-2 prose-h1:font-bold prose-h1:dark:text-gray-200 prose-h1:dark:font-bold prose-h1:font-display
  prose-h2:text-2xl prose-h2:font-display 
  prose-p:font-serif
  prose-a:font-serif prose-a:underline prose-a:dark:text-blue-300 prose-a:dark:hover:text-blue-400 prose-a:dark:underline
  prose-ul:font-serif prose-ul:ml-5 prose-ul:mt-2 prose-ul:mb-2
  prose-figure:w-full prose-figure:text-center prose-figure:m-auto
  prose-img:picture prose-img:mt-4 prose-img:shadow-lg prose-img:rounded-lg prose-img:border-2 prose-img:border-gray-200 prose-img:dark:border-gray-800 prose-img:border-opacity-50 prose-img:dark:border-opacity-50 prose-img:h-auto prose-img:max-w-md prose-img:m-auto
  prose-figcaption:text-center prose-figcaption:text-gray-500 prose-figcaption:dark:text-gray-400 prose-figcaption:text-sm prose-figcaption:mt-2
  prose-em:bg-blue-500/25 prose-em:px-1
  "
>
	<h1>คู่มือการใช้งานสำหรับร้านค้า</h1>
	<h2>การดูเมนูที่ถูกสั่งเข้ามา</h2>
	<p>
		เมนูที่ถูกสั่งเข้ามาจะแสดงอยู่ในหน้า<a href="/orders" class="link link-hover link-primary"
			>รายการสั่งอาหาร</a
		>
		โดยจะแสดงเมนูตามลำดับสั่งก่อน-หลัง
	</p>
	<figure class="w-full text-center m-auto">
		<img src="/004.png" alt="การดูเมนูที่ถูกสั่งเข้ามา" />
		<figcaption>ตัวอย่างหน้าสำหรับดูเมนูที่ถูกสั่งเข้ามา</figcaption>
	</figure>
	<p>
		เมื่อทำอาหารเสร็จแล้ว สามารถทำเครื่องหมายว่าเสร็จแล้วได้โดยกดปุ่ม <button
			class="btn btn-primary btn-sm gap-3"
			><Checkmark /><ShowOnAlt>เครื่องหมายถูก</ShowOnAlt></button
		> เพื่อนำออกจากรายการ หรือกดที่ <button
			class="btn btn-outline btn-sm gap-1 opacity-50"
			><Checkmark /> เสร็จแล้ว</button
		> เพื่อนำกลับเข้ามาในรายการ
	</p>
	<h2>การจัดการเมนูหรือวัตถุดิบ</h2>
	<figure>
		<img src="/005.png" alt="ตัวอย่างหน้าดูแลแก้ไขความพร้อมของเมนูและวัตถุดิบ" />
		<figcaption>ตัวอย่างหน้าดูแลแก้ไขความพร้อมของเมนูและวัตถุดิบ</figcaption>
	</figure>
	<p>
		ในการเพิ่มหรือลบเมนูหรือวัตถุดิบ สามารถทำได้โดยการเข้าไปที่หน้า<a
			href="/availability-setting"
			class="link link-hover link-primary">หน้าตั้งค่าเมนูประจำวัน</a
		>
		แล้วกดที่ปุ่ม
		<button class="btn btn-outline btn-sm gap-2"><Edit /> แก้ไขรายละเอียดรายการ</button> บริเวณด้านล่าง
		จะพบหน้าตาดังภาพด้านล่าง
	</p>
	<figure class="w-full text-center m-auto">
		<img src="/006.png" alt="หน้าตั้งค่าเมนูประจำวันเมื่อแก้ไข" />
		<figcaption>ตัวอย่างหน้าดูแลแก้ไขความพร้อมของเมนูและวัตถุดิบขณะอยู่ในโหมดแก้ไข</figcaption>
	</figure>
	<ul>
		<li>
			<b>การเพิ่มเมนูใหม่ในกลุ่มที่มีอยู่แล้ว:</b> สามารถเพิ่มเมนูใหม่ได้โดยการกดปุ่ม
			<button class="btn btn-ghost border-dashed btn-sm border-2 border-gray-700 gap-2"
				><Add />เพิ่มรายการ</button
			> ในกลุ่มที่ต้องการ จะเพิ่มรายการใหม่เปล่า ๆ และจะเปิดหน้าต่างเพื่อให้กรอกข้อมูลเมนู ได้แก่ชื่อเมนู
			และชื่ออื่นของเมนู โดยชื่ออื่นของเมนูจะเป็นชื่อที่ใช้ในการแสดงผลในหน้ารายการสั่งอาหาร และจะเป็นชื่อที่ใช้ในการค้นหาเมนู
			หากไม่มีชื่ออื่น สามารถเว้นว่างไว้ได้ เช่น บะหมี่เหลือง อาจมีชื่ออื่นเป็น "บะหมี่" "หมี่เหลือง"
		</li>
		<li>
			<b>การเพิ่มกลุ่มใหม่:</b> กดที่ปุ่ม
			<button class="btn btn-ghost border-dashed btn-sm border-2 border-gray-700 gap-2"
				><Add />เพิ่มกลุ่มใหม่</button
			>
			เพื่อสร้างกล่องกลุ่มเปล่า ๆ และกดปุ่ม
			<button class="btn btn-ghost border-dashed btn-sm border-2 border-gray-700 gap-2"
				><Add />เพิ่มรายการ</button
			>
			เพื่อเพิ่มเมนูในกล่องกลุ่ม และสามารถกดปุ่ม
			<button
				class="btn btn-sm btn-ghost tooltip gap-3"
				data-tip={`เปลี่ยนชื่อหัวข้อ "ชื่อหัวข้อ"`}
			>
				<Edit />
				<ShowOnAlt>แก้ไขชื่อหัวข้อ</ShowOnAlt>
			</button> เพื่อแก้ไขชื่อหัวข้อได้
		</li>
		<li>
			<b>การลบรายการ:</b> สามารถลบรายการได้โดยการกดปุ่ม
			<button class="btn btn-sm tooltip tooltip-bottom gap-3" data-tip="ลบออก">
				<TrashCan class="w-5 h-5 fill-red-400" />
				<ShowOnAlt>ถังขยะ</ShowOnAlt>
			</button>
		</li>
	</ul>
	<figure>
		<img src="/007.png" alt="หน้าต่างสำหรับแก้ไขรายละเอียดรายการ" />
		<figcaption>ตัวอย่างหน้าต่างแก้ไขรายละเอียดรายการในโหมดแก้ไข</figcaption>
	</figure>
	<ul>
		<li>
			<b>การแก้ไขเป็นรายรายการ:</b> ให้กดที่ปุ่ม
			<button class="btn btn-sm tooltip tooltip-bottom indicator gap-3" data-tip="แก้ไข"
				><Edit />
				<ShowOnAlt>แก้ไข</ShowOnAlt>
			</button>
			จะเปิดหน้าต่างให้กรอกข้อมูลรายละเอียดของรายการ เมื่อแก้ไขเรียบร้อยใหกดปุ่ม
			<button class="btn btn-primary btn-sm">ปิด</button>
			เพื่อปิดหน้าต่าง โดยเมื่อปิดแล้วให้กดบันทึกเพื่อบันทึกการเปลี่ยนแปลง หากต้องการยกเลิกการแก้ไข สามารถกดปุ่ม
			<button class="btn btn-secondary btn-outline btn-sm">ยกเลิก</button> ได้ โดยรายการใดที่มีการแก้ไข
			จะมีจุดสีฟ้าแสดงที่ปุ่มแก้ไขด้วย ดังภาพด้านล่าง
		</li>
	</ul>
	<figure>
		<img src="/008.png" alt="ตัวอย่างรายการเมื่อแก้ไขแล้ว จะมีจุดสีฟ้าที่ปุ่มดินสอ" />
		<figcaption>ตัวอย่างรายการเมื่อแก้ไขแล้ว จะมีจุดสีฟ้าที่ปุ่มดินสอ</figcaption>
	</figure>
	<h2>การเปิดปิดความพร้อมบริการของแต่ละรายการ</h2>
	<p>
		สามารถเปิดปิดความพร้อมบริการของแต่ละรายการได้โดยการกดปุ่มสวิชต์ <input
			type="checkbox"
			class="toggle toggle-primary toggle-sm"
		/>
		ดังภาพ โดยจะต้องไม่ได้อยู่ในโหมดแก้ไข และไม่ต้องกดปุ่มบันทึกใด ๆ และหากต้องการเปิดปิดทั้งหมวดในคราวเดียว
		สามารถกดที่ <b>ทั้งหมด</b> ได้
	</p>
	<figure>
		<img src="/009.png" alt="ตัวอย่างการเปิดปิดความพร้อมบริการของแต่ละรายการ" />
		<figcaption>ตัวอย่างการเปิดปิดความพร้อมบริการของแต่ละรายการ</figcaption>
	</figure>
	<h2>การแก้ไขรายละเอียดของรายการ</h2>
	<figure>
		<img src="/007.png" alt="หน้าต่างสำหรับแก้ไขรายละเอียดรายการ" />
		<figcaption>ตัวอย่างหน้าต่างแก้ไขรายละเอียดรายการในโหมดแก้ไข</figcaption>
	</figure>
	<p>ในหน้าต่างการแก้ไขเมื่อกดที่ปุ่มแก้ไขรายการ จะมีช่องข้อมูลสองช่อง ดังนี้</p>
	<ul>
		<li>
			<b>ชื่อรายการ</b> ให้กรอกชื่อของรายการที่ต้องการแก้ไข โดยอาจจะเป็นเมนูหรือวัตถุดิบ เช่น
			<em>กวางตุ้ง</em>
			หรือ <em>ข้าวผัด</em> ก็ได้
		</li>
		<li>
			<b> ชื่ออื่น </b> เนื่องด้วยวิธีการที่ใช้สำหรับการแยกชื่อเมนูในปัจจุบัน
			ทำให้ต้องเพิ่มชื่ออื่นสำหรับวัตถุดิบหรือเมนูไว้ด้วยเพื่อให้แชตบอตสามารถจดจำได้
			โดยค่าที่ใส่ต้องมีลูกน้ำ (<code>,</code>) คั่นระหว่างชื่อ เช่น กรณีกวางตุ้ง อาจใส่
			<em>ผักกาดเขียว, กวางตุ้งฮ่องเต้, กวางตุ้งใต้หวัน</em> เป็นต้น
		</li>
	</ul>
	<p>
		เมื่อแก้ไขเสร็จแล้ว ให้กดปุ่ม <button class="btn btn-primary btn-sm">ปิด</button>
		รายการที่แก้ไขแล้วจะมีจุดสีฟ้าที่ปุ่มดินสอแก้ไข หากแก้ไขเสร็จทั้งหมดแล้วให้กดที่
		<button class="btn btn-primary btn-sm gap-3">
			<Save class="inline-block w-6 h-6" /> บันทึก
		</button>
		เพื่อบันทึกการแก้ไข
	</p>
</div>

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 1.25rem;
		letter-spacing: 0.025em;
		text-align: center;
		text-decoration: none;
		white-space: nowrap;
		vertical-align: middle;
		cursor: pointer;
		user-select: text;
	}

	.toggle {
		display: inline-flex;
		align-items: center;
		vertical-align: middle;
	}
</style>
